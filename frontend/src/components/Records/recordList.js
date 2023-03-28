import { RecordWrap } from './styles';
import { Small, SubTitle } from '../Fonts/fonts';

const RecordList = () => {
  return (
    <RecordWrap>
      <img src={''} />
      <div>
        <div>
          <SubTitle>서울</SubTitle>
          <Small color={'7c7c7c'}>2023.01.01-2023.03.24</Small>
        </div>
        <div>⭐️⭐️⭐️⭐️⭐️</div>
      </div>
    </RecordWrap>
  );
};
export default RecordList;
