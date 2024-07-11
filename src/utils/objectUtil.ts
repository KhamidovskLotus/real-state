export function objectToFormData(obj: { [key: string]: any }): FormData {
  const formData = new FormData();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (Array.isArray(value)) {
        for (const item of value) {
          formData.append(key, item);
        }
      } else {
        formData.append(key, value);
      }
    }
  }
  return formData;
}

export const getImageId = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 1].split('.')[0];
};
