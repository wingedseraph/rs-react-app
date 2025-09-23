export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;

      resolve(base64String);
    };

    reader.onerror = () => {
      reject(new Error('error with read file'));
    };

    reader.readAsDataURL(file);
  });
};
