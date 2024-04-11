import React, {useEffect, useState} from "react";

export function ContainerWrapper(props) {
  const [showFirstDiv, setShowFirstDiv] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setShowFirstDiv(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {showFirstDiv && (
        <div style={{ width: '240px', background: 'lightblue' }}>
          {/* Content for the div on the left */}
        </div>
      )}
      <div>
        props.container
      </div>
    </div>
  );
}
