import requests

# Firecrawl MCP Prototype
# This prototype demonstrates interacting with the Firecrawl MCP over HTTP (SSE/JSON-RPC).

FIRECRAWL_MCP_URL = "https://mcp.firecrawl.dev/fc-97b7b6702407420a827da94351939e03/v2/mcp"


def test_firecrawl_mcp():
    print(f"Testing Firecrawl MCP at {FIRECRAWL_MCP_URL}...")
    try:
        # Check if the endpoint is reachable (basic GET or OPTIONS to see if it responds)
        response = requests.get(FIRECRAWL_MCP_URL)
        print(f"Status Code: {response.status_code}")
        if response.status_code in [200, 400, 404, 405]:
            print("Successfully reached the Firecrawl MCP endpoint!")
        else:
            print(f"Unexpected status: {response.text}")
    except Exception as e:
        print(f"Error reaching Firecrawl MCP: {e}")


if __name__ == "__main__":
    test_firecrawl_mcp()
    print("\nNote: IDEs like Cursor require 'type': 'sse' for HTTP-based MCP servers.")
