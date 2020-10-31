import { Segment, Header, Icon } from "semantic-ui-react"

function Error({ statusCode }) {
    return (
        <Segment>
            <Header as="h2">
                <Icon name="window close outline" />
                Error
            </Header>
            <Header.Subheader>
                {statusCode
                    ? (`An error ${statusCode} occurred on server.`)
                    : ('An error occurred on client.')
                }
            </Header.Subheader>
        </Segment>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error