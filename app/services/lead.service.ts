export const submitLead = async (data: LeadPayload) => {
  console.log("Sending Data:", data);

  const response = await fetch(
    "https://api.qr.examresults.org.in/api/submissions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    console.error("Backend Error:", result);
    throw new Error(result.message || JSON.stringify(result));
  }

  return result;
};