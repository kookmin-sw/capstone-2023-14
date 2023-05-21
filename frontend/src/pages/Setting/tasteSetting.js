import React, { useState } from 'react';
import {
  AddOptionModal,
  TasteWrap,
  Wrap,
  ButtonWrap,
  Options,
  Row,
} from './styles';
import Header from '../../components/Header/header';
import { SmallTitle, SubTitle, Title } from '../../components/Fonts/fonts';
import FullButton from '../../components/Buttons/fullButton';
import StrokeButton from '../../components/Buttons/strokeButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { email } from '../../store/userInfo';
import { Normal } from '../../components/Fonts/fonts';

function TasteSetting() {
  const navigator = useNavigate();
  const userEmail = useRecoilValue(email);

  const [userTaste, setUserTaste] = useState({
    email: userEmail,
    style: [],
    object: [],
    preferAge: [],
    preferGender: '',
  });

  const [styleTaste, setStyle] = useState([
    {
      name: 'style',
      value: '계획적',
    },
    {
      name: 'style',
      value: '즉흥적',
    },
    {
      name: 'style',
      value: '뚜벅이',
    },
    {
      name: 'style',
      value: '대중교통',
    },
  ]);
  const [objectTaste, setObject] = useState([
    {
      name: 'object',
      value: '휴양',
    },
    {
      name: 'object',
      value: '관광',
    },
    {
      name: 'object',
      value: '쇼핑',
    },
    {
      name: 'object',
      value: '액티비티',
    },
    {
      name: 'object',
      value: '음식&카페',
    },
    {
      name: 'object',
      value: '문화',
    },
    {
      name: 'object',
      value: '촬영',
    },
  ]);
  const ageTaste = ['10대', '20대', '30대', '40대', '50대', '상관없음'];

  const handleOnTasteSave = async () => {
    const saveInfo = {
      email: userEmail,
      style: userTaste.style.join(),
      object: userTaste.object.join(),
      preferAge: userTaste.preferAge.join(),
      preferGender: userTaste.preferGender,
    };

    try {
      await axios.post('/api/hashtag-taste', saveInfo);
      alert('취향 정보가 저장되었습니다.');
      navigator('/mypage');
    } catch (e) {
      console.log(e);
    }
  };

  const checkMyTaste = (e) => {
    const { name, value } = e.target;
    const checked = e.target.checked;
    const parent = e.target.parentNode;

    if (checked) {
      parent.style.border = '1.5px solid #EF4E3E';
    } else {
      parent.style.border = '1.5px solid #7c7c7c';
    }

    setUserTaste((prevState) => {
      if (Array.isArray(prevState[name])) {
        if (checked) {
          return {
            ...prevState,
            [name]: [...prevState[name], value],
          };
        } else {
          return {
            ...prevState,
            [name]: prevState[name].filter((item) => item !== value),
          };
        }
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };
  const [addOptionModal, setAddOptionModal] = useState(false);
  const [userAdd, setUserAdd] = useState({
    name: '',
    value: '',
  });

  // user의 취향 option 직접 추가 함수
  const AddOption = (e) => {
    const tag = e.target.tagName;
    let type = e.target.value;
    if (tag === 'LABEL') {
      type = e.target.children[0].value;
    }
    setUserAdd({ ...userAdd, name: type });
  };

  const HandleChangeOption = () => {
    if (userAdd.name === '' || userAdd.value === '') {
      alert('입력값을 모두 채워주세요.');
      return;
    }

    if (userAdd.name === 'style') {
      setStyle(styleTaste.concat(userAdd));
    } else if (userAdd.name === 'object') {
      setObject(objectTaste.concat(userAdd));
    }

    setAddOptionModal(false);
  };

  return (
    <TasteWrap>
      <Header title={'taste'} onClick={() => setAddOptionModal(true)} />
      <Wrap taste>
        <div>
          <Row title="true">
            <Title size={'20px'}>{userEmail}</Title>
            <Title color={'#7c7c7c'}>님의 여행스타일을 알려주세요 !</Title>
          </Row>
          <div>
            <SmallTitle margin={'0 0 12px'}>스타일</SmallTitle>
            <Row>
              {styleTaste.map((i, key) => (
                <Options key={key}>
                  <input
                    type={'checkbox'}
                    name={i.name}
                    value={i.value}
                    onClick={(e) => checkMyTaste(e)}
                  />
                  <Normal size={'14px'}>{i.value}</Normal>
                </Options>
              ))}
            </Row>
          </div>
          <div>
            <SmallTitle margin={'0 0 12px'}>목적</SmallTitle>
            <Row>
              {objectTaste.map((i, key) => (
                <Options key={key}>
                  <input
                    type={'checkbox'}
                    name={i.name}
                    value={i.value}
                    onClick={(e) => checkMyTaste(e)}
                  />
                  <Normal size={'14px'}>{i.value}</Normal>
                </Options>
              ))}
            </Row>
          </div>
        </div>
        <div>
          <Row title="true">
            <Title size={'20px'}>{userEmail}</Title>
            <Title color={'#7c7c7c'}>님은 이런 동행자를 선호해요 !</Title>
          </Row>
          <div>
            <SmallTitle margin={'0 0 12px'}>연령대</SmallTitle>
            <Row>
              {ageTaste.map((i, key) => (
                <Options key={key}>
                  <input
                    type={'checkbox'}
                    name={'preferAge'}
                    value={i}
                    onClick={(e) => checkMyTaste(e)}
                  />
                  <Normal size={'14px'}>{i}</Normal>
                </Options>
              ))}
            </Row>
          </div>
          <div>
            <SmallTitle margin={'0 0 12px'}>성별</SmallTitle>
            <Row>
              <Options>
                <input
                  type={'checkbox'}
                  name={'preferGender'}
                  value={'동성'}
                  onClick={(e) => checkMyTaste(e)}
                />
                <Normal size={'14px'}>동성</Normal>
              </Options>
              <Options>
                <input
                  type={'checkbox'}
                  name={'preferGender'}
                  value={'혼성'}
                  onClick={(e) => checkMyTaste(e)}
                />
                <Normal size={'14px'}>혼성</Normal>
              </Options>
            </Row>
          </div>
        </div>
        <ButtonWrap>
          <FullButton btnName={'저장'} onClick={handleOnTasteSave} />
          <StrokeButton btnName={'취소'} onClick={() => navigator(-1)} />
        </ButtonWrap>
      </Wrap>
      {addOptionModal ? (
        <AddOptionModal>
          <div>
            <div>
              <SubTitle margin={'0 0 8px'}>type</SubTitle>
              <div>
                <label onClick={AddOption}>
                  <input type={'radio'} name={'addOption'} value={'style'} />
                  스타일
                </label>
                <label onClick={AddOption}>
                  <input type={'radio'} name={'addOption'} value={'object'} />
                  목적
                </label>
              </div>
              <input
                type={'text'}
                placeholder={'추가하고자 하는 값을 입력해주세요.'}
                onChange={(e) =>
                  setUserAdd({ ...userAdd, value: e.target.value })
                }
              />
            </div>
            <div>
              <button onClick={HandleChangeOption}>추가</button>
              <button onClick={() => setAddOptionModal(false)}>취소</button>
            </div>
          </div>
        </AddOptionModal>
      ) : null}
    </TasteWrap>
  );
}
export default TasteSetting;
