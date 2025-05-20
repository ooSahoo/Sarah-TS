import * as React from 'react';

export function Title({style, margin, children}) {
  return <h3 style={{
    fontSize: 18,
    fontWeight: 600,
    margin,
    ...style
  }}>{children}</h3>;
}

export function Cards({style, children}) {
  return (
    <div className="block-on-mobile" style={{ display: "flex", flexWrap: "wrap", margin: '0 -7px', ...style }}>
      {children}
    </div>
  );
}

export function Card({style, title, isBig, children, href, icon}) {
  return (
    <a href={href} data-proofer-ignore style={{
      flex: `0 calc(100% / ${isBig ? 3 : 2})`,
      display: 'flex',
      color: 'black',
      textDecoration: 'none',
    }}>
      <div className="shadow-on-hover" style={{ 
        flex: 1, 
        display: 'flex',
        flexDirection: isBig ? 'column' : 'row',
        border: '1px solid #CCCCCC', 
        borderRadius: 3,
        margin: 7,
        padding: 24,
        ...style 
      }}>
        <img height={32} src={icon} style={{
          alignSelf: isBig ? 'start' : 'center',
          paddingRight: 18,
          marginBottom: 16,
        }} />
        <div>
          <Title margin="0 0 4px">{title}</Title>
          <div style={{fontSize: 16, lineHeight: "20px"}}>{children}</div>
        </div>
      </div>
    </a>
  );
}

export function MiniCard({style, title, isBig, children, href}) {
  return (
    <a href={href} data-proofer-ignore style={{
      flex: `0 calc(100% / ${isBig ? 3 : 2})`,
      display: 'flex',
      color: 'black',
      textDecoration: 'none',
    }}>
      <div className="shadow-on-hover" style={{
        flex: 1,
        display: 'flex',
        flexDirection: isBig ? 'column' : 'row',
        border: '1px solid #BEC7FA',
        borderRadius: 3,
        margin: 7,
        padding: 24,
        ...style
      }}>
        <div>
          <Title margin="0 0 8px" style={{fontSize: 16, color: "#5468D4"}}>{title}</Title>
          <div style={{fontSize: 16, lineHeight: "20px", color: "#242424"}}>{children}</div>
        </div>
      </div>
    </a>
  );
}


export function MiniCardAPI({style, title, isBig, children, href}) {
  return (
    <a href={href} data-proofer-ignore style={{
      flex: `0 calc(100% / ${isBig ? 3 : 2})`,
      display: 'flex',
      color: 'black',
      textDecoration: 'none',
    }}>
      <div className="shadow-on-hover" style={{
        flex: 1,
        display: 'flex',
        flexDirection: isBig ? 'column' : 'row',
        border: '1px solid #CCCCCC',
        borderRadius: 3,
        margin: 7,
        padding: 24,
        ...style
      }}>
        <div>
          <Title margin="0 0 8px" style={{fontSize: 16, color: "#0B2666"}}>{title}</Title>
          <div style={{fontSize: 16, lineHeight: "20px", color: "#293A4D"}}>{children}</div>
        </div>
      </div>
    </a>
  );
}

