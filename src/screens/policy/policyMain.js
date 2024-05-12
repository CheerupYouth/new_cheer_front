import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as S from "../../../style/MainStyle";
import * as P from "../../../style/policy";
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { API } from '../../../utils/api/api';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const policyMain = ({navigation}) => {
  const [allPolicy, setAllPolicy] = useState([])

  // 모든 정책 조회
  const getPolicy = async () => {
    try {
      const response = await axios.get('http://localhost:3000/policy');
      console.log(response.data)
      setAllPolicy(response.data)
    } catch (error) {
      // localStorage.clear();
      // navigate('/login')
      // console.error('물품 목록을 불러오는 데 실패했습니다.', error);
    } finally {
      // setIsLoading(false); // 데이터 로딩이 끝나면 로딩 상태를 false로 설정
    }
  }

  useEffect(()=>{
    getPolicy()
  }, [])

  return (
    <P.Container>
      {allPolicy.map((policy)=> {
        return (
          <P.policyBox key={policy.key} onPress={() => navigation.navigate('policy_detail', { key: policy.key })}>
            <View>
              <P.title>{policy.title}</P.title>
              <P.subtitle>{policy.sub_title}</P.subtitle>
            </View>
          </P.policyBox>
        )
      })}
    </P.Container>
  );
};

export default policyMain;