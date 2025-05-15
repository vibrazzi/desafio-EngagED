<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <AppHeaderContainer>
    <Title>Rick and Morty</Title>
    <ThemeButton @click="toggleTheme">
      {{ isDarkMode ? 'Modo Claro' : 'Modo Escuro' }}
    </ThemeButton>
  </AppHeaderContainer>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineOptions({ name: 'TheHeader' });
import styled from 'vue-styled-components';
import { defineProps } from 'vue';

defineProps({
  toggleTheme: Function,
  isDarkMode: Boolean,
});

const AppHeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.headerBackground};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${(props) => props.theme.text};
`;

const ThemeButton = styled.button`
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.buttonHover};
  }
`;
</script>
