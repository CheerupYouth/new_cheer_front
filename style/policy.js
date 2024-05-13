import React from 'react';
import { ScrollView } from 'react-native'; // ScrollView를 react-native로부터 정확히 임포트
import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  color: #2e4b8f;
`;

export const policyBox = styled.TouchableOpacity`
  display: flex;
  width: 90%;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid #d2d2d2;
  margin: 8px auto;
`;
export const title = styled.Text`
  margin-bottom: 10px;
  font-size: 18px;
  word-break: keep-all;
`;
export const subtitle = styled.Text`
  word-break: keep-all;
  font-size: 12px;
`;
export const policyImg = styled.Image`
  width: 100px;
`;

// 세부사항
export const DetailHeader = styled.View`
  display: flex;
  flex-direction : row;
  justify-content: space-between;
  padding: 10px;
  font-size: 30px;
`;

export const headerTitle = styled.Text`
  width: 60%;
  text-align: center;
`;

export const policyMenu = styled(ScrollView).attrs({
  horizontal: true, // 가로 스크롤 활성화
  showsHorizontalScrollIndicator: false // 스크롤 인디케이터 숨기기
})`
  display: flex;
  flex-direction : row;
`;

export const policyText = styled.Text`
  padding: 10px;
`;

export const contentBox = styled.View`
  padding: 10px;
`;

export const contentBoxTitle = styled.Text`
  padding: 5px;
  font-weight: bold;
`;

export const contentBoxContent = styled.Text`
  padding: 2px 5px;
  flex: 1;            
`;
