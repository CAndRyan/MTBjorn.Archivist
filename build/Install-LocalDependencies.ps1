#

[CmdletBinding()]
param (
    [Parameter(Mandatory=$true)]
    [ValidateSet("all", "firestorm", "hypotenuse", "reagent")]
    [string]
    $Package
)

if ($Package -eq "all") {
    $scriptPath = Join-Path $PSScriptRoot $MyInvocation.MyCommand.Name
    & $scriptPath -Package "firestorm"
    & $scriptPath -Package "hypotenuse"
    & $scriptPath -Package "reagent"
    return
}

if ($Package -eq "firestorm") {
    $packageName = "MTBjorn.Firestorm"
} elseif ($Package -eq "hypotenuse") {
    $packageName = "MTBjorn.Hypotenuse"
} elseif ($Package -eq "reagent") {
    $packageName = "MTBjorn.Reagent"
} else {
    throw "Invalid package '$Package'"
}

$packagePath = Join-Path $PSScriptRoot "..\..\$packageName" -Resolve
& $(Join-Path $PSScriptRoot "Install-LocalNpmPackage.ps1") -Path $packagePath
