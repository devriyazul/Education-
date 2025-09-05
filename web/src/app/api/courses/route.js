import sql from "../utils/sql.js";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const level = url.searchParams.get('level');
    const language = url.searchParams.get('language');
    const search = url.searchParams.get('search');
    const limit = parseInt(url.searchParams.get('limit')) || 20;
    const offset = parseInt(url.searchParams.get('offset')) || 0;

    let query = `
      SELECT 
        c.*,
        cat.name as category_name,
        CASE 
          WHEN c.instructor_id IS NOT NULL 
          THEN (SELECT u.name FROM users u JOIN instructors i ON i.user_id = u.id WHERE i.id = c.instructor_id)
          ELSE 'Unknown'
        END as instructor_name
      FROM courses c
      LEFT JOIN categories cat ON c.category_id = cat.id
      WHERE c.is_published = true
    `;
    
    const params = [];
    let paramCount = 0;

    if (category && category !== 'All') {
      paramCount++;
      query += ` AND cat.name = $${paramCount}`;
      params.push(category);
    }

    if (level && level !== 'All') {
      paramCount++;
      query += ` AND c.level = $${paramCount}`;
      params.push(level.toLowerCase());
    }

    if (language && language !== 'All') {
      paramCount++;
      query += ` AND c.language = $${paramCount}`;
      params.push(language.toLowerCase());
    }

    if (search) {
      paramCount++;
      query += ` AND (
        LOWER(c.title) LIKE LOWER($${paramCount}) OR 
        LOWER(c.description) LIKE LOWER($${paramCount})
      )`;
      params.push(`%${search}%`);
    }

    query += ` ORDER BY c.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(limit, offset);

    const courses = await sql(query, params);

    // Transform the data to match frontend expectations
    const transformedCourses = courses.map(course => ({
      id: course.id,
      title: course.title,
      instructor: course.instructor_name,
      category: course.category_name,
      level: course.level.charAt(0).toUpperCase() + course.level.slice(1),
      duration: `${course.duration_hours} hours`,
      students: course.total_students,
      rating: parseFloat(course.rating),
      price: parseInt(course.price),
      originalPrice: course.original_price ? parseInt(course.original_price) : null,
      thumbnail: course.thumbnail_url,
      description: course.description,
      lessons: course.total_lessons,
      isPremium: course.is_premium,
      language: course.language.charAt(0).toUpperCase() + course.language.slice(1)
    }));

    return Response.json({ courses: transformedCourses, success: true });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return Response.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      instructor_id,
      category_id,
      level,
      language,
      price,
      original_price,
      thumbnail_url,
      duration_hours,
      total_lessons,
      is_premium
    } = body;

    // Validate required fields
    if (!title || !category_id || !level || !language) {
      return Response.json({ 
        error: 'Missing required fields: title, category_id, level, language' 
      }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO courses (
        title, description, instructor_id, category_id, level, language,
        price, original_price, thumbnail_url, duration_hours, total_lessons, is_premium
      ) VALUES (
        ${title}, ${description}, ${instructor_id}, ${category_id}, ${level},
        ${language}, ${price || 0}, ${original_price}, ${thumbnail_url},
        ${duration_hours || 0}, ${total_lessons || 0}, ${is_premium || false}
      ) RETURNING *
    `;

    return Response.json({ course: result[0], success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return Response.json({ error: 'Failed to create course' }, { status: 500 });
  }
}