// const UPLOAD_FOLDER_BASE_URL = `http://localhost:6000/uploads/`;

// const stables = { UPLOAD_FOLDER_BASE_URL};

// export default stables;

const stables = {
    UPLOAD_FOLDER_BASE_URL: import.meta.env.VITE_UPLOAD_FOLDER_BASE_URL || 'http://localhost:5000/uploads/',
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/'
  };
  
  export default stables;