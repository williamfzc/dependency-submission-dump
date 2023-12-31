#!/bin/bash
set -e

# Save the current git branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Checkout to some branch here
git checkout ${TARGET}
DSD_ECOSYSTEM=${ECO} DSD_OUTPUT=target.json dsd dump

# Checkout back to the original branch
git checkout "$current_branch"
DSD_ECOSYSTEM=${ECO} DSD_OUTPUT=source.json dsd dump

# compare
dsd diff target.json source.json
