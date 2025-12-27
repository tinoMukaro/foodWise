import 'dotenv/config';

export const cookies = {
  getOptions: () => {
    const isProd = process.env.NODE_ENV === "production";

    return {
      httpOnly: true,
      secure: isProd,              
      sameSite: isProd ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    };
  },

  set: (res, name, value, options = {}) => {
    res.cookie(name, value, { ...cookies.getOptions(), ...options });
  },

  clear: (res, name, options = {}) => {
    res.clearCookie(name, { ...cookies.getOptions(), ...options });
  },

  get: (req, name) => req.cookies[name],
};
