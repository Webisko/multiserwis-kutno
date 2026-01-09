/**
 * API Client for MultiSerwis Backend
 * Handles all HTTP requests with token management
 */

const API_URL = 'http://localhost:5000/api';

interface ApiResponse {
  success?: boolean;
  data?: any;
  message?: string;
  [key: string]: any;
}

interface ApiError extends Error {
  status?: number;
  details?: any;
}

/**
 * Make authenticated API request
 */
export async function apiCall(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const token = localStorage.getItem('token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });

    // Handle 401 - invalid/expired token
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }

    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = new Error(data.message || `API Error: ${response.status}`);
      error.status = response.status;
      error.details = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Auth endpoints
 */
export const authApi = {
  async login(email: string, password: string) {
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  async register(email: string, password: string, name: string) {
    const response = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    });
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  async validateToken() {
    return apiCall('/auth/validate');
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

/**
 * Courses endpoints
 */
export const coursesApi = {
  async getAll() {
    return apiCall('/courses');
  },

  async getById(id: string) {
    return apiCall(`/courses/${id}`);
  },

  async create(courseData: any) {
    return apiCall('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData)
    });
  },

  async update(id: string, courseData: any) {
    return apiCall(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData)
    });
  },

  async delete(id: string) {
    return apiCall(`/courses/${id}`, {
      method: 'DELETE'
    });
  }
};

/**
 * Modules endpoints
 */
export const modulesApi = {
  async getByCourseId(courseId: string) {
    return apiCall(`/modules?courseId=${courseId}`);
  },

  async getById(id: string) {
    return apiCall(`/modules/${id}`);
  },

  async create(moduleData: any) {
    return apiCall('/modules', {
      method: 'POST',
      body: JSON.stringify(moduleData)
    });
  },

  async update(id: string, moduleData: any) {
    return apiCall(`/modules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(moduleData)
    });
  },

  async delete(id: string) {
    return apiCall(`/modules/${id}`, {
      method: 'DELETE'
    });
  }
};

/**
 * Lessons endpoints
 */
export const lessonsApi = {
  async getByModuleId(moduleId: string) {
    return apiCall(`/lessons?moduleId=${moduleId}`);
  },

  async getById(id: string) {
    return apiCall(`/lessons/${id}`);
  },

  async create(lessonData: any) {
    return apiCall('/lessons', {
      method: 'POST',
      body: JSON.stringify(lessonData)
    });
  },

  async update(id: string, lessonData: any) {
    return apiCall(`/lessons/${id}`, {
      method: 'PUT',
      body: JSON.stringify(lessonData)
    });
  },

  async delete(id: string) {
    return apiCall(`/lessons/${id}`, {
      method: 'DELETE'
    });
  }
};

/**
 * Enrollments endpoints
 */
export const enrollmentsApi = {
  async getByUserId(userId: string) {
    return apiCall(`/enrollments?userId=${userId}`);
  },

  async getByUserId2(userId: string) {
    return apiCall(`/enrollments?userId=${userId}`);
  },

  async create(enrollmentData: any) {
    return apiCall('/enrollments', {
      method: 'POST',
      body: JSON.stringify(enrollmentData)
    });
  },

  async update(id: string, enrollmentData: any) {
    return apiCall(`/enrollments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(enrollmentData)
    });
  },

  async delete(id: string) {
    return apiCall(`/enrollments/${id}`, {
      method: 'DELETE'
    });
  }
};

/**
 * Progress endpoints
 */
export const progressApi = {
  async getByUserId(userId: string) {
    return apiCall(`/progress?userId=${userId}`);
  },

  async create(progressData: any) {
    return apiCall('/progress', {
      method: 'POST',
      body: JSON.stringify(progressData)
    });
  },

  async update(id: string, progressData: any) {
    return apiCall(`/progress/${id}`, {
      method: 'PUT',
      body: JSON.stringify(progressData)
    });
  }
};

/**
 * Certificates endpoints
 */
export const certificatesApi = {
  async getByUserId(userId: string) {
    return apiCall(`/certificates?userId=${userId}`);
  },

  async create(certData: any) {
    return apiCall('/certificates', {
      method: 'POST',
      body: JSON.stringify(certData)
    });
  }
};

/**
 * Employees endpoints
 */
export const employeesApi = {
  async getAll() {
    return apiCall('/employees');
  },

  async getById(id: string) {
    return apiCall(`/employees/${id}`);
  },

  async create(employeeData: any) {
    return apiCall('/employees', {
      method: 'POST',
      body: JSON.stringify(employeeData)
    });
  },

  async update(id: string, employeeData: any) {
    return apiCall(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employeeData)
    });
  },

  async delete(id: string) {
    return apiCall(`/employees/${id}`, {
      method: 'DELETE'
    });
  }
};
