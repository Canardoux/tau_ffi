// Copyright 2017 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef THIRD_PARTY_BLINK_RENDERER_CORE_ANIMATION_CSS_RAY_INTERPOLATION_TYPE_H_
#define THIRD_PARTY_BLINK_RENDERER_CORE_ANIMATION_CSS_RAY_INTERPOLATION_TYPE_H_

#include "third_party/blink/renderer/core/animation/css_interpolation_type.h"

namespace blink {

class CSSRayInterpolationType : public CSSInterpolationType {
 public:
  CSSRayInterpolationType(PropertyHandle property)
      : CSSInterpolationType(property) {
    DCHECK(CssProperty().PropertyID() == CSSPropertyID::kOffsetPath);
  }

  void ApplyStandardPropertyValue(const InterpolableValue&,
                                  const NonInterpolableValue*,
                                  StyleResolverState&) const final;
  void Composite(UnderlyingValueOwner&,
                 double underlying_fraction,
                 const InterpolationValue&,
                 double interpolation_fraction) const final;

 protected:
  InterpolationValue MaybeConvertNeutral(const InterpolationValue& underlying,
                                         ConversionCheckers&) const final;
  InterpolationValue MaybeConvertInitial(const StyleResolverState&,
                                         ConversionCheckers&) const final;
  InterpolationValue MaybeConvertInherit(const StyleResolverState&,
                                         ConversionCheckers&) const final;
  InterpolationValue MaybeConvertValue(const CSSValue&,
                                       const StyleResolverState*,
                                       ConversionCheckers&) const final;
  InterpolationValue MaybeConvertStandardPropertyUnderlyingValue(
      const ComputedStyle&) const final;
  PairwiseInterpolationValue MaybeMergeSingles(
      InterpolationValue&& start,
      InterpolationValue&& end) const final;
};

}  // namespace blink

#endif  // THIRD_PARTY_BLINK_RENDERER_CORE_ANIMATION_CSS_RAY_INTERPOLATION_TYPE_H_