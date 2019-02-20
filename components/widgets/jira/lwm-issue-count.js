import { Component } from 'react'
import Widget from '../../widget'
import Counter from '../../counter'
import axios from 'axios'

export default class LWMIssueCount extends Component {
	static defaultProps = {
		interval: 1000 * 60 * 5,
		title: 'LWM Issue Count',
	}

	state = {
		count: 0,
		error: false,
		loading: true,
	}

	componentDidMount() {
		this.fetchInformation()
	}

	async fetchInformation() {
		const { data } = await axios.get(
			'http://localhost:3001/api/jira?query=2/search?jql=project%20=%20LWM%20AND%20type%20=%20Bug%20AND%20resolution%20=%20Unresolved'
		)

		this.setState({ count: data.total, loading: false })
	}

	render() {
		const { count, error, loading } = this.state
        const { title } = this.props

		return (
			<Widget title={title} loading={loading} error={error}>
				<Counter value={count} />
			</Widget>
		)
	}
}
