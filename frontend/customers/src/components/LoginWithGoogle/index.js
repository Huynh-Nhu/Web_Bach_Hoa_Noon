import { GoogleLogin } from "react-google-login";

function LoginWithGoogle({ onSuccess, onFailure }) {
  const responseGoogle = (response) => {
    if (response.tokenId) {
      onSuccess(response.tokenId);
    } else {
      onFailure(response.error);
    }
  };

  return (
    <GoogleLogin
    clientId="YOUR_GOOGLE_CLIENT_ID" 
    buttonText="Đăng nhập bằng Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={"single_host_origin"}
    />
      
    
  );
}

export default LoginWithGoogle;
