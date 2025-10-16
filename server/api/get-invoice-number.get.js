export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  
  try {
    // Получаем следующий номер счета из Strapi
    const response = await fetch(`${config.public.strapi.url}/api/invoice-counter/next`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Ошибка получения номера счета');
    }
    
    return {
      success: true,
      data: data.data
    };
    
  } catch (error) {
    console.error('Error getting invoice number:', error);
    
    return {
      success: false,
      error: 'Ошибка при получении номера счета'
    };
  }
});
