import { hubRoutes } from "@/components/pages/collectionRoutes";

const routes = hubRoutes("subjects");

export const generateStaticParams = routes.generateStaticParams;
export const generateMetadata = routes.generateMetadata;
export default routes.Page;
