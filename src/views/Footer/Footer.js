import React from 'react';
import { Button } from 'antd';

const Footer = () => {
  const moveToTop = () => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <footer>
      {/* Top 버튼 */}
      <Button
        shape="circle"
        onClick={moveToTop}
        style={{ position: 'fixed', bottom: '10px', right: '10px' }}
      >
        TOP
      </Button>
    </footer>
  );
};

export default Footer;
