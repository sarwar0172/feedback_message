import { Html, Head, Font, Preview, Heading, Row, Section, Text, Button } from "@react-email/components"

interface VerificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (

        <Html>
            <Head>
                <title>verification Code</title>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Arial"
                    webFont={{
                        url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
                        format: "woff2",
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Preview>verification code</Preview>

            <section>
                <Row>
                    <Heading>Verification Code</Heading>
                </Row>
                <Row>
                    <Text>Thank you for registering. please use the following verifaction code to complete your registration</Text>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
                <Row>
                    <Text>if you did not request this code , please ignore this email</Text>
                </Row>
                
            </section>

        </Html>
    )
}