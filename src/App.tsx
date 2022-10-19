import Router from "@/routers/index";
import { useLocation } from "react-router-dom";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import AuthRouter from "@/routers/utils/authRouter";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
import "@/assets/font/iconfont.css";

const queryClient = new QueryClient();

function App() {
  const { pathname } = useLocation();

  return (
    <ConfigProvider locale={zh_CN}>
      <AuthRouter>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </AuthRouter>
    </ConfigProvider>
  );
}

export default App;
