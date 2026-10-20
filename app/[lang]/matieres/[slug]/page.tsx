import { detailRoutes } from "@/components/pages/collectionRoutes";

const routes = detailRoutes("subjects");

export const dynamicParams = false;
export const generateStaticParams = routes.generateStaticParams;
export const generateMetadata = routes.generateMetadata;
export default routes.Page;
