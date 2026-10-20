import { hubRoutes } from "@/components/pages/collectionRoutes";

const routes = hubRoutes("regions");

export const generateStaticParams = routes.generateStaticParams;
export const generateMetadata = routes.generateMetadata;
export default routes.Page;
