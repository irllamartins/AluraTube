import styled from 'styled-components';


export const FooterBase = styled.footer`
  background: ${({ theme }) => theme.backgroundLevel };
  height: 160px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 64px;
  padding-bottom: 32px;
  color:  ${({ theme }) =>theme.textColorBase };
  text-align: center;
  @media (max-width: 800px) {
    margin-bottom: 50px;
  }
`;