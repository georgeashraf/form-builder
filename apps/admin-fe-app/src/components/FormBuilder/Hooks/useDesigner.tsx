import { useContext } from 'react';
import { DesignerContext } from '../Context/DesignerContext';

const useDesigner = () => {
  const context = useContext(DesignerContext);
  if (!context) {
    throw new Error('Error');
  }
  return context;
};

export default useDesigner;
