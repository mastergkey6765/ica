export interface HubSpotField {
  name: string;
  value: string | number | boolean;
}

export interface HubSpotSubmission {
  portalId?: string;
  formId?: string;
  fields: HubSpotField[];
  context?: {
    pageUri: string;
    pageName: string;
  };
}

export const submitToHubSpot = async ({
  portalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID || '43715335',
  formId,
  fields,
  context = {
    pageUri: window.location.href,
    pageName: document.title,
  }
}: HubSpotSubmission) => {
  // If variables are not configured, simulate success (or log a warning) so app functions normally in dev.
  if (!portalId || !formId || portalId === '' || formId === '') {
    console.warn('HubSpot Portal ID or Form ID is missing. Form submission bypassed in dev mode.');
    return { success: true, bypassed: true };
  }

  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields,
        context,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('HubSpot API error:', errorData);
      throw new Error(`HubSpot submission failed: ${response.statusText}`);
    }

    const data = await response.json().catch(() => null);
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting to HubSpot:', error);
    throw error;
  }
};
