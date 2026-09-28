import type {Metadata} from "next"; import "./globals.css";
export const metadata:Metadata={title:"Discover Bangladesh",description:"Explore Bangladesh"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}