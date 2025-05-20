class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props); //this calles parent constructor function so that its get all te features of the react component like lifecyle
		//we need to pass props so that props gets assigned to "this" and we can use it as this.props

		this.state = { hasError: false };
	}

	//use this to update the state if any error occurs this method is invoked.
	static getDerivedStateFromError(error) {
		this.state = { hasError: true };
	}

	render() {
		if (this.hasError) {
			return <>Error has occurrred</>;
		}

		return this.props.children;
	}
}


/* 


Wrap this component aroun the normal components  so that any error that bubbles up and 
will be caught in this component . So that entire application wont go kaput. 


*/