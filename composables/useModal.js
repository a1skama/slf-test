export const useModal = () => {
  const modals = useState("modals", () => ({
    form: false,
    menu: false,
    pay: false,
  }));

  const isOpen = (key) => !!modals.value[key];

  const openModal = (key) => {
    for (let k in modals.value) {
      modals.value[k] = false;
    }

    modals.value[key] = true;
  };

  const closeModal = (key) => {
    modals.value[key] = false;
  };

  return { isOpen, openModal, closeModal };
};
