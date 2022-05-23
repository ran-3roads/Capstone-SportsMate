import { useRouter } from "next/router";
import { useHistory } from "react-router-dom";
export default function Auth() {
    const router = useRouter();
    const { code } = router.query;
    return (
      <div>
        hi
      </div>
    );
  }
  