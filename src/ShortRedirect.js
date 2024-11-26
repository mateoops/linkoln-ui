import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ShortRedirect() {
  const { url } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRedirectUrl = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/short/${url}`);
        const redirectUrl = response.data.Url;

        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          console.error("Redirect URL not found in response.");
          navigate("/", { replace: true }); // Redirect to home on missing URL
        }
      } catch (error) {
        console.error("Error fetching redirect URL:", error);
        navigate("/", { replace: true }); // Redirect to home if error occurs
      }
    };

    fetchRedirectUrl();
  }, [url, navigate]);

  return null; // No need to render anything since we're redirecting
}

export default ShortRedirect;
