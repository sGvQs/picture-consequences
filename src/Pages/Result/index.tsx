import { Typography } from '../../Components/Common/Typography';
import { useStoreState } from '../../Context/StoreStateProvider';

export const Result = () => {
  const { currentPoint } = useStoreState();
  return (
    <div>
      <Typography text={'Your Point :' + currentPoint} />
    </div>
  );
};
