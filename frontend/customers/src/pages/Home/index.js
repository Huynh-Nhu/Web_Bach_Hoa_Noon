// HomePage.js
import LoginWithGoogle from "../../components/LoginWithGoogle";

function HomePage() {
    const handleGoogleLoginSuccess = (tokenId) => {
        // Xử lý thành công đăng nhập bằng Google
        console.log('Đăng nhập thành công với Google Token ID:', tokenId);
      };
    
      const handleGoogleLoginFailure = (error) => {
        // Xử lý lỗi đăng nhập bằng Google
        console.error('Lỗi đăng nhập bằng Google:', error);
      };
    
    return (
        <div>
            <LoginWithGoogle
                 onSuccess={handleGoogleLoginSuccess}
                 onFailure={handleGoogleLoginFailure}
            />
        </div>
    );
}

export default HomePage;