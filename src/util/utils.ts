export const hasSetupAccount = () => {
  console.log(localStorage.getItem('hasSetupAccount'));
  return (
    localStorage.getItem('hasSetupAccount') !== '' &&
    !!localStorage.getItem('hasSetupAccount')
  );
};
