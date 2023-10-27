import { useEffect } from "react";

type Props = {
  systemTitle: string;
}

function Header({systemTitle}: Props){

  useEffect(() => {
    // call API
  }, [])
  
  return (
    <div>
      <h1>{systemTitle}</h1>
    </div>
  )
}

export default Header;
