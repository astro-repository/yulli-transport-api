import fetch from 'node-fetch';
import { toastr } from 'react-redux-toastr';
import history from '../../../../history';

async function submit(values, dispatch) {
    
    if (values.content == null || values.content == '<p><br></p>' || values.content == '<p> </p>') {
        toastr.error("Error Occured", "Please Add  Content");
    } else {
        const mutation = `
          mutation updateContentPageDetails(
            $id: Int,
            $metaTitle: String,
            $metaDescription: String,
            $pageUrl: String,
            $pageTitle: String,
            $content: String,
            $pageBanner: String
          ) {
            updateContentPageDetails(
              id: $id,
              metaTitle: $metaTitle,
              metaDescription: $metaDescription,
              pageUrl: $pageUrl,
              pageTitle: $pageTitle,
              content: $content,
              pageBanner: $pageBanner
            ) {
                status
            }
          }
          `;

        const response = await fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: mutation,
                variables: values
            }),
            credentials: 'include'
        });

        const { data } = await response.json();

        
    if (data && data.updateContentPageDetails && data.updateContentPageDetails.status === "success") {
      toastr.success("Update Page", "Changes are updated!");
      history.push('/siteadmin/contentpage/manage')
    }
    else if ( data && data.updateContentPageDetails && data.updateContentPageDetails.status === 'URL exist') {
      toastr.error("Added Page Failed", "The page URL already exist!");
    }
    else {
      toastr.error("Update Page", "Updating Content Page Details failed");
    }
  

    }
}

export default submit;