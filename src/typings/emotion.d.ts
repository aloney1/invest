import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      fontColor: string;
      bgColor: string;
      contentBgColor: string;
      mainBgColor: string;
      tableBodyFontColor: string;
      tableHeaderFontColor: string;
      btnBg: string;
      selectShadow: string;
      selectColor: string;
      nftShadow: string;
      nodataColor: string;
      isDark: boolean;
      disBtnColor: string;
    };
  }
}
