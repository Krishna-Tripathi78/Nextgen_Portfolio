import react from 'react'
import type {Metadata} from "next";
export const metadata: Metadata ={
    title:"Nextgen Portfolio",
    description:"NextGen Portfolio",

};

function layout({children}:{children:React.ReactNode}) {
    return(
        <html lang="en">
            <body>
                {children}
            </body>

        </html>
    )
}
export default layout