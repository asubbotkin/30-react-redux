import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { clearError, selectErrorMessage } from '../../redux/slices/errorSlice';
import 'react-toastify/dist/ReactToastify.css';

function Error() {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectErrorMessage);

  useEffect(() => {
    if (errorMessage) {
      toast.warn(errorMessage);
      dispatch(clearError());
    }
  }, [errorMessage, dispatch]);
  return <ToastContainer position="top-right" autoClose={2000} />;
}
export default Error;
