import { useContext } from 'react';
import { DesignerContext } from '../Context/DesignerContext';

const useDesigner = () => {
  const context = useContext(DesignerContext);
  if (!context) {
    throw new Error('Designer Hook Cant be used outside form context');
  }
  return context;
};

export default useDesigner;
