<?php

namespace App\Lib;

class HtmlMeta
{
    private const DEFAULT_DESCRIPTION = 'デフォルトの説明文';
    private const DEFAULT_IMAGE = 'https://example.com/example.png';

    public string $ogType;
    public string $ogTitle;
    public string $ogDescription;

    public function __construct(
        public string $canonical,
        public string $title,
        public string $description = self::DEFAULT_DESCRIPTION,
        public string $ogImage = self::DEFAULT_IMAGE
    ) {
        $this->ogType = 'website';
        $this->ogTitle = $title;
        $this->ogDescription = $description;
    }

    public function setOgType(string $type): self
    {
        $this->ogType = $type;
        return $this;
    }

    public function setOgTitle(string $title): self
    {
        $this->ogTitle = $title;
        return $this;
    }

    public function setOgDescription(string $description): self
    {
        $this->ogDescription = $description;
        return $this;
    }

    public function setOgImage(string $imageUrl): self
    {
        $this->ogImage = $imageUrl;
        return $this;
    }
}
