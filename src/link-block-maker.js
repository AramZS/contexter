const getBestLink = function(linkDataObj){
	return linkDataObj.canonical ? linkDataObj.canonical : linkDataObj.sanitizedLink
}

const useOembed = function(linkDataObj){
	return linkDataObj.hasOwnProperty('oembed') ? linkDataObj.oembed : false
}

const getTitle = () => {}

const getPreviewImage = () => {}

const getDescription = () => {}

const getByline = () => {}

const getTopics = () => {}
