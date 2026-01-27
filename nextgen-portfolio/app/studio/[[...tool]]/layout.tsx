import react from 'react'
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