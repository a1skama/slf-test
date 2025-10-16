export const useModal = () => {
  const modals = useState('modals', () => ({
    form: false,
    menu: false,
    pay: false,
  }));

  const modalData = useState('modalData', () => ({
    pay: null,
  }));

  const isOpen = (key) => !!modals.value[key];

  const openModal = (key, data = null) => {
    for (let k in modals.value) {
      modals.value[k] = false;
    }

    modals.value[key] = true;

    if (data && modalData.value.hasOwnProperty(key)) {
      modalData.value[key] = data;
    }
  };

  const closeModal = (key) => {
    modals.value[key] = false;
    if (modalData.value.hasOwnProperty(key)) {
      modalData.value[key] = null;
    }
  };

  const getModalData = (key) => {
    return modalData.value[key] || null;
  };

  return { isOpen, openModal, closeModal, getModalData };
};
