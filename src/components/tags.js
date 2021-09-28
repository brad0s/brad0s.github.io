import React from "react"

export default function Tags({ tags }) {
  return (
    <div className="tags">
      {tags.map(tag => (
        <div>{tag}</div>
      ))}
    </div>
  )
}
