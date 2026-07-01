$file = "D:\sn\pe-latest-09\src\sections\promotionalSection.jsx"
$content = [System.IO.File]::ReadAllText($file)

# Replace 1: Add pageTitle state after blocks state
$old1 = "const [blocks, setBlocks] = useState([]);"
$new1 = "const [blocks, setBlocks] = useState([]);`r`n  const [pageTitle, setPageTitle] = useState("");"
$content = $content.Replace($old1, $new1)

# Replace 2: Save pageTitle from API response
$old2 = "if (res.success) {`r`n          setBlocks(res?.data?.blocks || []);"
$new2 = "if (res.success) {`r`n          setBlocks(res?.data?.blocks || []);`r`n          setPageTitle(res?.data?.title || res?.data?.page_title || "");"
$content = $content.Replace($old2, $new2)

# Replace 3: Update title display
$old3 = "{hero?.section_title || `"Promotional Page ${pageNumber}`"}"
$new3 = "{pageTitle || hero?.section_title || `"Promotional Page ${pageNumber}`"}"
$content = $content.Replace($old3, $new3)

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Output "Done"
