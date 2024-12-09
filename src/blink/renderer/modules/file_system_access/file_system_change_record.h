// Copyright 2023 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef THIRD_PARTY_BLINK_RENDERER_MODULES_FILE_SYSTEM_ACCESS_FILE_SYSTEM_CHANGE_RECORD_H_
#define THIRD_PARTY_BLINK_RENDERER_MODULES_FILE_SYSTEM_ACCESS_FILE_SYSTEM_CHANGE_RECORD_H_

#include <optional>

#include "third_party/blink/public/mojom/file_system_access/file_system_access_observer.mojom-blink.h"
#include "third_party/blink/renderer/bindings/modules/v8/v8_file_system_change_type.h"
#include "third_party/blink/renderer/platform/bindings/script_wrappable.h"
#include "third_party/blink/renderer/platform/heap/member.h"

namespace blink {
class FileSystemHandle;

class FileSystemChangeRecord : public ScriptWrappable {
  DEFINE_WRAPPERTYPEINFO();

 public:
  static FileSystemChangeRecord* Create(
      FileSystemHandle* root,
      FileSystemHandle* changed_handle,
      Vector<String> relative_path_components,
      V8FileSystemChangeType type,
      std::optional<Vector<String>> relative_path_moved_from = std::nullopt);

  FileSystemChangeRecord(
      FileSystemHandle* root,
      FileSystemHandle* changed_handle,
      Vector<String> relative_path_components,
      V8FileSystemChangeType type,
      std::optional<Vector<String>> relative_path_moved_from);

  FileSystemChangeRecord(FileSystemHandle* root,
                         FileSystemHandle* changed_handle,
                         const Vector<String>& relative_path_components,
                         mojom::blink::FileSystemAccessChangeTypePtr type);

  FileSystemHandle* root() const { return root_.Get(); }
  FileSystemHandle* changedHandle() const { return changed_handle_.Get(); }
  const Vector<String>& relativePathComponents() const {
    return relative_path_components_;
  }
  const V8FileSystemChangeType& type() const { return type_; }
  const std::optional<Vector<String>>& relativePathMovedFrom() const {
    return relative_path_moved_from_;
  }

  void Trace(Visitor* visitor) const override;

 private:
  const V8FileSystemChangeType type_;

  const Member<FileSystemHandle> root_;
  const Member<FileSystemHandle> changed_handle_;
  const Vector<String> relative_path_components_;
  const std::optional<Vector<String>> relative_path_moved_from_;
};

}  // namespace blink

#endif  // THIRD_PARTY_BLINK_RENDERER_MODULES_FILE_SYSTEM_ACCESS_FILE_SYSTEM_CHANGE_RECORD_H_