import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components/native';
import Logo from '../components/Logo';
import Id from '../components/Id';
import Id_Pw_Sign from '../components/Id_Pw_Sign';
import Division from '../components/Division';
import {SafeAreaView, View, TouchableOpacity, Text, Image} from 'react-native';
import * as S from '../../style/LoginStyle';
import axios from 'axios';
import {SERVER_URL} from '../components/ServerAddress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../components/UserProvider';
import { Button } from 'react-native-paper';
import {KakaoOAuthToken, login, logout, getProfile, KakaoProfile} from '@react-native-seoul/kakao-login';

const LoginScreen = ({navigation}) => {
  const [userId, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const {userDataP, setUserDataP} = useContext(UserContext);
  
  const handleKakaoLogin = async () => { // 함수 선언 시 async 키워드 추가
    try {
      const token = await login(); // token
      const profile = await getProfile(); // user 정보

      console.log('token', token.accessToken)
      console.log('profile', profile.email, profile.nickname)
      const headers = {
        Authorization: `Bearer ${token.accessToken}`
      };
      const userData = {
        email : profile.email,
        name: profile.nickname
      }
      
      const response = await axios.post('http://localhost:3000/users_social/api/login/kakao', userData, { headers });
      console.log('서버에서 응답', response.data); // 응답 메세지
      console.log('header', response.headers.authorization); // 백엔드에서 응답받은 새로운 토큰
    } catch (error) {
      if (error.response) {
        // 서버가 상태 코드를 응답으로 보냈을 경우
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        console.log("Headers:", error.response.headers);
      } else if (error.request) {
        // 요청은 이루어졌으나 응답을 받지 못한 경우
        console.log(error.request);
      } else {
        // 요청 설정 중 발생한 에러
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  };

  const handleKaKaoLogout = async () => {
    const message = await logout();
    console.log('로그아웃', message)
  };

  const submitBtn = async () => {
    const userData = {
      id: userId,
      password: password,
    };

    try {
      const response = await axios.post(`${SERVER_URL}/login`, userData);
      await AsyncStorage.setItem('userData', JSON.stringify(response.data));
      setUserDataP(prevUserData => ({
        ...prevUserData,
        id: userId,
      }));
      navigation.navigate('Main');
    } catch (error) {
      console.error('데이터를 보내는 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <S.MainContainer>
        <S.LogoContainer>
          <Logo />
        </S.LogoContainer>
        <S.InputContainer>
          <Id
            onPress={() => {
              submitBtn();
            }}
            userId={userId}
            setUserid={setUserid}
            password={password}
            setPassword={setPassword}
          />
          <Id_Pw_Sign />
        </S.InputContainer>
        <Division />

        {/* 소셜 로그인 */}
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={()=>{console.log('카카오 로그인')}}>
          {/* <TouchableOpacity onPress={handleKakaoLogin}> */}
            <Image
              source={require('../../assets/images/kakao_login.png')}
              resizeMode="contain"
              style={{ width: 300 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleKaKaoLogout}>
            <Text>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </S.MainContainer>
    </SafeAreaView>
  );
};

export default LoginScreen;
